# TODO - Nav Bar & Google Analytics Update

## Task 1: Update Navigation Bar (add Pricing link) in all HTML files

- [x] index.html - add Pricing link, set Home active
- [x] about.html - add Pricing link, set About active
- [x] contact.html - add Pricing link, set Contact active
- [x] pricing.html - set Pricing active (already has Pricing)
- [x] privacy.html - add Pricing link, set Privacy active
- [x] terms.html - add Pricing link, set Terms active
- [x] static.html - add Pricing link, set Terms active
- [x] dynamic.html - add Pricing link, set Terms active
- [x] seo.html - add Pricing link, set Terms active
- [x] adsense-eligibility-checker.html - add Pricing link, set Terms active
- [x] full-stack-starter-kit.html - add Pricing link, set Terms active

## Task 2: Add Google Analytics to files missing it

- [x] about.html - add GA
- [x] contact.html - add GA
- [x] privacy.html - add GA
- [x] terms.html - add GA
- [x] adsense-eligibility-checker.html - add GA
- [x] full-stack-starter-kit.html - add GA

## Google Analytics Script to Add:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-P1G1G7PLGC"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-P1G1G7PLGC');
</script>
```

## ✅ ALL TASKS COMPLETED


