# Nhan Doan - Lab7

1) Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.

I would put the automated tests in a GitHub Action that runs whenever code is pushed. I think this makes the most sense because the project gets checked automatically after each change, so we can catch problems earlier. Since the Recipe project has front-end behavior, end-to-end tests can help make sure the page still works the way users expect. It also means we are not depending only on someone remembering to test everything manually before pushing. Waiting until all development is finished would be too late, because bugs would be harder to track down and fix at that point.

2) Would you use an end to end test to check if a function is returning the correct output? (yes/no)

No. An end-to-end test is meant to test a full user flow, such as loading a page, clicking buttons, typing into inputs, or checking that the UI changes correctly. If I only want to check whether one function returns the correct output, I would use a unit test instead because it directly tests that function in isolation and is faster/simpler than running a full browser test.

3) What is the difference between navigation and snapshot mode?

Navigation mode analyzes a page right after it loads. It measures the initial page-load experience, including performance metrics such as First Contentful Paint, Largest Contentful Paint, Total Blocking Time, Speed Index, and Cumulative Layout Shift. However, it does not analyze user interactions or content changes after the page has loaded. Snapshot mode analyzes the page in its current state at the moment the audit runs. It is useful for checking the current DOM and accessibility issues, but it does not measure the full page-load process or JavaScript performance during loading.

4) Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.

Based on the Lighthouse results, the CSE 110 shop site already performs very well, with 100 in Performance, 95 in Accessibility, 100 in Best Practices, and 91 in SEO. Three things we could improve are:

1. Improve caching by using more efficient cache lifetimes for static files. Lighthouse flagged “Use efficient cache lifetimes,” so setting better cache headers could reduce unnecessary network requests for returning users.

2. Reduce or reorganize render-blocking requests. Lighthouse flagged “Render-blocking requests,” so loading non-critical CSS or JavaScript later could help the page render more efficiently.

3. Improve accessibility and SEO by adding more descriptive alt text for product images and better metadata, such as a clear meta description. This would help screen readers understand the page and improve how the site is described by search engines.





