import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const port = 4173
const server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(port)], {
  stdio: 'ignore',
  shell: false,
})

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))

try {
  await wait(1800)
  await mkdir('screenshots', { recursive: true })
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })

  for (const viewport of [
    { name: 'desktop-1440', width: 1440, height: 1000 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
  ]) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } })
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle' })
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' })
    await page.screenshot({ path: `screenshots/${viewport.name}-opening.png`, fullPage: false })

    for (const target of ['explorer', 'modernise', 'close']) {
      await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ block: 'start' }), target)
      await wait(250)
      await page.screenshot({ path: `screenshots/${viewport.name}-${target}.png`, fullPage: false })
      if (target !== 'close') {
        await page.evaluate((offset) => window.scrollBy(0, offset), Math.round(viewport.height * 0.88))
        await page.screenshot({ path: `screenshots/${viewport.name}-${target}-detail.png`, fullPage: false })
      }
    }
    await page.close()
  }

  await browser.close()
} finally {
  server.kill('SIGTERM')
}
