# Nhan Doan - Lab7

1) Where would you fit your automated tests in your Recipe project development pipeline? Select one of the following and explain why.

I would put the automated tests in a GitHub Action that runs whenever code is pushed. I think this makes the most sense because the project gets checked automatically after each change, so we can catch problems earlier. Since the Recipe project has front-end behavior, end-to-end tests can help make sure the page still works the way users expect. It also means we are not depending only on someone remembering to test everything manually before pushing. Waiting until all development is finished would be too late, because bugs would be harder to track down and fix at that point.

2) Would you use an end to end test to check if a function is returning the correct output? (yes/no)

No. An end-to-end test is meant to test a full user flow, such as loading a page, clicking buttons, typing into inputs, or checking that the UI changes correctly. If I only want to check whether one function returns the correct output, I would use a unit test instead because it directly tests that function in isolation and is faster/simpler than running a full browser test.





