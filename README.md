# An othello game

## Getting started
1. Install Git 
2. Install node
3. Run in terminal: **git clone https://github.com/OMMatte/ACM-W-game.git**
4. Navigate to the git repo (the downloaded folder), using the terminal.
5. Run in terminal: **git checkout trainee**. this is to change the branch of the repo to the **trainee** branch.
6. Run in terminal: **npm install**. This installs all dependencies and dev-dependencies specified in the package.json file.
7. Run in terminal: **npm run watch:test**. This runs the tests and every time you change the code inside the src directory. The tests are run again.

## Git
Fact of the day: **Git** is the versioning system. **Github** is just an flexible and visual web-hosted solution based on Git. Other web-hosted solutions based on **Git** exists.

Most important commands:
##### git clone <repo-name>
This is to download a repo. Only done one time per repo and per computer.

##### git checkout <branch-name>
This is to switch branch, for instance to **trainee**

##### git status
This outputs information about the current status of your local git repository. Very helpful

##### git pull
This pulls down the latest online changes so that your local repository is in sync with the online repository

##### git add <file-name>
This stages files that you have changed. **git add .** prepares all files that you have changed.

##### git commit -m "<commit-message>"
This makes an commit of all staged files together with an commit message.

##### git push
This pushes all local commits that you have made to the online git repository.

####

## Node
Node (or NodeJS) is a runtime environment for javascript. In allows us to run javascript code without having it connected to a browser. Basically the equivalent of Java Virtual Machine (JVM) for Java. 