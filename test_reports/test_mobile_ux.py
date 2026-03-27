import asyncio
from playwright.async_api import async_playwright

BASE_URL = "https://your-numbers-calc.preview.emergentagent.com"
SESSION_TOKEN = "sess_paid_1773353168"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 390, "height": 844})
        
        # Set session cookie
        await context.add_cookies([{
            "name": "session_token",
            "value": SESSION_TOKEN,
            "domain": "your-numbers-calc.preview.emergentagent.com",
            "path": "/",
            "httpOnly": True,
            "secure": True,
            "sameSite": "None"
        }])
        
        page = await context.new_page()
        
        print("=== TEST 1-3: /portal mobile 390px ===")
        await page.goto(f"{BASE_URL}/portal")
        await page.wait_for_timeout(3000)
        
        # Check if we got past auth
        url = page.url
        print(f"Current URL: {url}")
        
        # Test 1: horizontal overflow
        overflow_data = await page.evaluate("""() => {
            return {
                scrollWidth: document.body.scrollWidth,
                innerWidth: window.innerWidth,
                overflow: document.body.scrollWidth > window.innerWidth
            };
        }""")
        print(f"scrollWidth: {overflow_data['scrollWidth']}, innerWidth: {overflow_data['innerWidth']}")
        if not overflow_data['overflow']:
            print("PASS: No horizontal overflow on /portal mobile")
        else:
            print(f"FAIL: Horizontal overflow detected ({overflow_data['scrollWidth']} > {overflow_data['innerWidth']})")
        
        # Test 2: portal-header-userinfo hidden
        ui_data = await page.evaluate("""() => {
            const el = document.querySelector('.portal-header-userinfo');
            if (!el) return {found: false};
            const style = window.getComputedStyle(el);
            return {found: true, display: style.display};
        }""")
        print(f"portal-header-userinfo: {ui_data}")
        if ui_data.get('found') and ui_data.get('display') == 'none':
            print("PASS: portal-header-userinfo is hidden on mobile")
        elif not ui_data.get('found'):
            print("FAIL: portal-header-userinfo class not found in DOM")
        else:
            print(f"FAIL: portal-header-userinfo visible (display: {ui_data.get('display')})")
        
        # Test 3: SYSTEM_STATUS_MONITOR still visible
        monitor_data = await page.evaluate("""() => {
            const allText = document.body.innerText;
            const found = allText.includes('SYSTEM_STATUS_MONITOR');
            return {found: found};
        }""")
        if monitor_data['found']:
            print("PASS: SYSTEM_STATUS_MONITOR text is present on page")
        else:
            print("FAIL: SYSTEM_STATUS_MONITOR text not found")
        
        await page.screenshot(path="/app/test_reports/portal_mobile_390.jpg", quality=40, full_page=False)
        print("Screenshot saved: portal_mobile_390.jpg")
        
        print("\n=== TEST 4: /ground-0-briefing accordion labels ===")
        await page.goto(f"{BASE_URL}/ground-0-briefing")
        await page.wait_for_timeout(3000)
        
        # Check accordion module labels don't wrap
        label_data = await page.evaluate("""() => {
            const results = [];
            const labels = ['G0-1', 'G0-2', 'G0-3', 'G0-4', 'G0-5', 'G0-6'];
            for (const label of labels) {
                // Find spans containing these labels
                const spans = Array.from(document.querySelectorAll('span'));
                const span = spans.find(s => s.textContent.trim() === label);
                if (span) {
                    const rect = span.getBoundingClientRect();
                    const style = window.getComputedStyle(span);
                    results.push({
                        label: label,
                        found: true,
                        height: rect.height,
                        whiteSpace: style.whiteSpace,
                        wraps: rect.height > 25  // single line should be ~20px or less
                    });
                } else {
                    results.push({label: label, found: false});
                }
            }
            return results;
        }""")
        
        all_pass = True
        for item in label_data:
            if not item.get('found'):
                print(f"INFO: {item['label']} span not found")
            elif item.get('wraps'):
                print(f"FAIL: {item['label']} wraps to 2 lines (height: {item['height']}px, whiteSpace: {item.get('whiteSpace')})")
                all_pass = False
            else:
                print(f"PASS: {item['label']} single line (height: {item['height']}px, whiteSpace: {item.get('whiteSpace')})")
        
        if all_pass:
            print("PASS: All accordion labels display on single line")
        
        await page.screenshot(path="/app/test_reports/ground0_mobile_390.jpg", quality=40, full_page=False)
        print("Screenshot saved: ground0_mobile_390.jpg")
        
        await browser.close()

asyncio.run(main())
