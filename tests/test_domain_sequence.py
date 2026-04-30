import asyncio
from playwright.async_api import async_playwright

BASE = 'https://your-numbers-calc.preview.emergentagent.com'

domains = [
    {'url': '/standards/new-entrant-packet', 'step': 1, 'next_href': '/standards/dq-file-builder', 'next_label': 'Domain 2'},
    {'url': '/standards/dq-file-builder', 'step': 2, 'next_href': '/standards/drug-alcohol-packet', 'next_label': 'Domain 3'},
    {'url': '/standards/drug-alcohol-packet', 'step': 3, 'next_href': '/standards/hos-packet', 'next_label': 'Domain 4'},
    {'url': '/standards/hos-packet', 'step': 4, 'next_href': '/standards/maintenance-packet', 'next_label': 'Domain 5'},
    {'url': '/standards/maintenance-packet', 'step': 5, 'next_href': '/standards/insurance-packet', 'next_label': 'Domain 6'},
    {'url': '/standards/insurance-packet', 'step': 6, 'next_href': '/compliance-library', 'next_label': 'Bundle'},
]

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})

        results = []

        for d in domains:
            step = d['step']
            url = BASE + d['url']
            next_href = d['next_href']
            next_label = d['next_label']
            try:
                await page.goto(url, wait_until='networkidle', timeout=15000)
                await page.wait_for_timeout(800)

                strip = await page.query_selector('[data-testid="domain-sequence-strip"]')
                if strip:
                    strip_text = await strip.text_content()
                    step_text = f"DOMAIN {step} OF 6"
                    has_step = step_text in strip_text or str(step) in strip_text
                    print(f"[PASS] Domain {step}: strip found, snippet='{strip_text[:100]}'")
                    results.append(('PASS', f'Domain {step} strip found'))
                else:
                    print(f"[FAIL] Domain {step}: domain-sequence-strip NOT FOUND")
                    results.append(('FAIL', f'Domain {step} strip missing'))

                buy_btn = await page.query_selector('[data-testid="buy-packet-btn"]')
                if buy_btn:
                    print(f"[PASS] Domain {step}: buy-packet-btn found")
                    results.append(('PASS', f'Domain {step} buy btn'))
                else:
                    print(f"[FAIL] Domain {step}: buy-packet-btn NOT FOUND")
                    results.append(('FAIL', f'Domain {step} buy btn missing'))

                selector = 'a[href*="' + next_href + '"]'
                next_links = await page.query_selector_all(selector)
                if next_links:
                    link_text = await next_links[0].text_content()
                    has_label = next_label in link_text
                    print(f"[PASS] Domain {step}: next link to {next_href} found, text='{link_text.strip()[:80]}', has_label={has_label}")
                    if has_label:
                        results.append(('PASS', f'Domain {step} next link label correct'))
                    else:
                        print(f"[WARN] Domain {step}: next link missing label '{next_label}'")
                        results.append(('WARN', f'Domain {step} next link label missing'))
                else:
                    print(f"[FAIL] Domain {step}: next link to {next_href} NOT FOUND")
                    results.append(('FAIL', f'Domain {step} next link missing'))

            except Exception as e:
                print(f"[ERROR] Domain {step}: {e}")
                results.append(('ERROR', f'Domain {step}: {e}'))

        # Non-domain page test
        try:
            await page.goto(BASE + '/standards/starter-stack', wait_until='networkidle', timeout=15000)
            await page.wait_for_timeout(500)
            strip = await page.query_selector('[data-testid="domain-sequence-strip"]')
            if strip is None:
                print(f"[PASS] Non-domain page: no strip (correct)")
                results.append(('PASS', 'Non-domain page no strip'))
            else:
                print(f"[FAIL] Non-domain page: strip PRESENT (should not be)")
                results.append(('FAIL', 'Non-domain page has strip'))
        except Exception as e:
            print(f"[ERROR] Non-domain page: {e}")
            results.append(('ERROR', f'Non-domain page: {e}'))

        await browser.close()

        passed = sum(1 for r in results if r[0] == 'PASS')
        failed = sum(1 for r in results if r[0] in ('FAIL', 'ERROR'))
        print(f"\nSummary: {passed} passed, {failed} failed out of {len(results)}")

asyncio.run(run())
