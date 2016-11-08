# Contributing

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow [STYLE-GUIDE.md](STYLE-GUIDE.md)
2. Run the tests and linter before submitting a pull request.
3. Tests are very, very important. Submit tests if your pull request contains new, testable behavior.

## Checklist:

This is just to help you organize your process

- [ ] Did I cut my work branch off of master (don't cut new branches from existing feature branches)?
- [ ] Did I follow the correct naming convention for my branch?
- [ ] Is my branch focused on a single main change?
  - [ ] Do all of my changes directly relate to this change?
- [ ] Did I rebase the upstream master branch after I finished all my work?
- [ ] Did I write a clear pull request message detailing what changes I made?
- [ ] Did I get a code review?
  - [ ] Did I make any requested changes from that code review?


If you follow all of these guidelines and make good changes, you should have no problem getting your changes merged in.

## General Workflow

1. Clone down the master directly (do not fork):
  
  ```bash
  $ git clone https://github.com/collaboard/collabourd your directory
  ```
2. Create a new feature branch from master, If it's a new feature, name the branch `feat#-short-description`. If it's a bug fix, name the branch `bug#-short-description`. `#` should be the associated issue number on the GitHub repo, ie `feat10-add-navbar`.
  
  ```bash
  $ git checkout -b feat3-feat-description
  ```
  OR
  
  ```bash
  $ git checkout -b bug11-bug-description
  ```
3. Make changes and commit to your feature branch.
  
  ```bash
  $ git add file1.js
  $ git add file2.js
  ```
4. Sync up with latest master before pushing to remote feature branch:
  
  ```bash
  $ git pull --rebase origin master​
  ```
5. Fix any merge conflicts if necessary.
6. Push changes to remote feature branch:
  
  ```bash
  $ git push origin feat3
  ```
7. Generate pull request
8. Fix any issues highlighted by reviewer if necessary.
9. When everything checks out, reviewer merges pull request to master.
10. When a pull request is merged and closed, delete feat3 branch.

## Detailed Workflow

### Cut a namespaced feature branch from master

Your branch should follow this naming convention:
  - `bug#-description`
  - `feat#-description`
  - `test#-description`
  - `refactor#-description`

Where `#` associates directly with the issue number in the GitHub repo

Creates your branch and brings you there:
```bash
git checkout -b your-branch-name
```

### Make commits to your feature branch.

If your specific commit fixes a bug or test describe the issue 
it fixes with a reference to the issue number. `Fixes #10 broken
bug name` 

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. `Fix continuous integration script`.
- The first line of your commit message should be a brief summary of what the commit changes. Aim for about 70 characters max. Remember: This is a summary, not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should be a blank line and then a more detailed description of the commit. This can be as detailed as you want, so dig into details here and keep the first line short.

### Rebase upstream changes into your branch

Once you are done making changes, you can begin the process of getting your code merged into the main repo. Step 1 is to rebase upstream changes to the master branch into yours by running this command from your branch:

```bash
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes before doing this. If there are no conflicts, this should just roll all of your changes back on top of the changes from upstream, leading to a nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way through the rebasing process. Git will pause rebasing to allow you to sort out the conflicts. You do this the same way you solve merge conflicts, by checking all of the files git says have been changed in both histories and picking the versions you want. Be aware that these changes will show up in your pull request, so try and incorporate upstream changes as much as possible.

You pick a file by `git add`ing it - you do not make commits during a rebase.

Once you are done fixing conflicts for a specific commit, run

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all conflicts you should run the existing tests to make sure you didn’t break anything, then run your new tests (there are new tests, right?) and make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master branch, detailing exactly what changes you made and what feature this should add. The clearer your pull request is the faster you can get your changes incorporated into this repo.

At least one other person MUST give your changes a code review, and once they are satisfied they will merge your changes into upstream. Alternatively, they may have some requested changes. You should make more commits to your branch to fix these, then follow this process again from rebasing onwards.

Note: A pull request will be immediately rejected if there are any conflicts!

Once you get back here, make a comment requesting further review and someone will look at your code again. If they like it, it will get merged, else, just repeat again.

Thanks for contributing!

<!-- Links -->
[pull request]: https://help.github.com/articles/using-pull-requests/
[DRY]: http://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[boy scout rule]: http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule
[squashed]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
