import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import teamData from '../../src/content/team.json';

interface TeamMember {
  name: string;
  degree: string;
  image: string | null;
  website: string | null;
  googleScholar: string | null;
  startYear?: number;
  coSupervisors: string | null;
}

interface TeamData {
  currentStudents: TeamMember[];
  alumni: TeamMember[];
}

const typedTeamData = teamData as TeamData;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'team');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadAndProcessImage(url: string, outputPath: string) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  
  // Process image with Sharp
  await sharp(Buffer.from(buffer))
    .resize(200, 200, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 })
    .toFile(outputPath);
}

async function scrapeScholarProfile(userId: string) {
  const url = `https://scholar.google.com/citations?user=${userId}&hl=en`;
  
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait for and get the profile image
    const imgSelector = '#gsc_prf_pup-img';
    await page.waitForSelector(imgSelector);
    
    const imgUrl = await page.evaluate((selector: string) => {
      const img = document.querySelector(selector) as HTMLImageElement;
      return img ? img.src : null;
    }, imgSelector);
    
    await browser.close();

    // Log the full URL for debugging
    console.log(`Image URL for ${userId}: ${imgUrl}`);

    // Check for default avatar URLs
    if (imgUrl && (
      imgUrl.includes('scholar.google.com/citations/images/avatar_scholar_128.png') ||
      imgUrl.includes('scholar.google.com/citations?view_op=view_photo')
    )) {
      console.log(`Default avatar detected for ${userId}: ${imgUrl}`);
      return null;
    }

    return imgUrl;
  } catch (error) {
    console.error(`Error scraping profile for ${userId}:`, error);
    return null;
  }
}

async function main() {
  const allMembers = [...typedTeamData.currentStudents, ...typedTeamData.alumni];
  
  // First, clean up any existing images that are no longer needed
  const existingImages = fs.readdirSync(OUTPUT_DIR);
  const validImagePaths = allMembers
    .filter(member => member.image)
    .map(member => member.image!.split('/').pop());

  for (const image of existingImages) {
    if (!validImagePaths.includes(image)) {
      const imagePath = path.join(OUTPUT_DIR, image);
      fs.unlinkSync(imagePath);
      console.log(`Deleted unused image: ${image}`);
    }
  }

  for (const member of allMembers) {
    if (!member.googleScholar) continue;
    
    console.log(`\nProcessing ${member.name} (${member.googleScholar})...`);
    
    try {
      const imgUrl = await scrapeScholarProfile(member.googleScholar);
      
      if (imgUrl) {
        // Create filename from name (lowercase, replace spaces with hyphens)
        const filename = member.name.toLowerCase().replace(/\s+/g, '-') + '.jpg';
        const outputPath = path.join(OUTPUT_DIR, filename);
        
        await downloadAndProcessImage(imgUrl, outputPath);
        
        // Update the image path in team.json
        member.image = `/images/team/${filename}`;
        
        console.log(`✓ Successfully processed ${member.name}`);
      } else {
        // Set image to null if no valid image was found
        member.image = null;
        console.log(`✗ No valid image found for ${member.name} (using placeholder)`);
      }
    } catch (error) {
      console.error(`Error processing ${member.name}:`, error);
      member.image = null;
    }
  }
  
  // Save updated team.json
  fs.writeFileSync(
    path.join(process.cwd(), 'src', 'content', 'team.json'),
    JSON.stringify(typedTeamData, null, 2)
  );
  
  console.log('\nDone!');
}

main().catch(console.error); 