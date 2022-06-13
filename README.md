
# Setup
Clone the project: 
```
git clone https://github.com/Pjiwm/circle-project/
```

## Docker Setup
### If you do not have Docker installed yet, but want to use the Docker setup:
If you Are on windows 10/11 Home: 
1. Install WSL: [WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install)
2. Restart your computer,  and run in powershell:
```
WSL -l 
``` 
3. If you receive any errors troubleshoot.
4. If Windows did not install a default distro (Ubuntu) Install one from the MS store: [Ubuntu from MS store](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV?hl=en-us&gl=US)
5. For a more comfortable working environment get Windows Terminal and set Ubuntu as your default CLI: [Windows Terminal from MS store](https://apps.microsoft.com/store/detail/ubuntu/9PDXGNCFSCZV?hl=en-us&gl=US)
6. Install Docker: [Docker](https://www.docker.com/)
7. Restart computer
8. Open Docker-Desktop open settings and got to: `Resources > WSL Integration` Enable Ubuntu and press refresh
9. Open Windows Terminal or Ubuntu and see if the docker command is working.

If you are on Linux, Mac or Windows 10/11 Pro:
1. Install Docker
2. Run Docker in a CLI to see if it works
### When Docker is installed:
1. navigate to the repo in a terminal or inside your IDE's CLI
2. Copy and paste `sample.env` (to keep it on the repo) and rename it to `.env`
3. run `docker-compose build`
4. run `docker-compose up`

### Using remote containers with VSCode
For an optimal dev environment use the Remote containers extensions.
1. Open VSCode in this project
2. Install Remote - Containers from Microsoft (ms-vscode-remote.remote-containers)
3. Copy and paste `sample.env` (to keep it on the repo) and rename it to `.env`
4. Open the command pallet `ctrl` + `shift` + `p` and run `> Remote Containers: Open Folder in container..`
5. You should now be inside the container within VSCode.

## Regular Setup
1. Install Node 16: [guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Install NX globally with `npm install -g nx`
3. Copy and paste `sample.env` (to keep it on the repo) and rename it to `.env`
4. Setup a local MariaDB server or any other MySQL server.
5. Use a tool like Xamp or phpMyAdmin to manage your local databases.
6. Install OpenSSL on Windows.

## Working environment
### Managing the project in your editor/IDE
Open the project in your editor/IDE preferably VSCode due to extensions used for linting and the NX gui extension.
- If you do not use VSCode make sure you can use ESLint linting and optionally an extension for NX. Otherwise you have to use the NX CLI. 
  (If you use og Vim, Nano or [Ed](https://en.wikipedia.org/wiki/Ed_(text_editor)) have fun 💀)
- If you use Docker with remote containers all extensions should be installed already.
- If you are not using Docker but are using VSCode make sure to install the recommended extensions.
Set prettier as your formatter, this will make sure you're not making any linting errors.
### Project structure
This repository is an NX monorepo. This means different projects backend, frontend etc. are all in the same workspace area.
in the `apps` directory the different projects can be found. The `libs` directory can be used to put resources in that will be reused over different apps.
Running tests, building, serving, generating new components, linting etc. can all be done using NX commands.
In VSCode simply navigate to the left. There should be a logo with the letters NX. Using this extension running any NX command will become fairly easy.
For more information: [NX setup](https://nx.dev/getting-started/nx-setup)

# Contribution rules
## Code conventions
- Strict convention rules are not applied in any frontend Projects. Most components and boilerplate will be generated already.
- No unused variables
- Always make use of semicolons (;) at the end of a statement.
- Use single quotes.
- All functions must have a JSDoc comment.
```TS
   /**
    * I am a JSDoc, I describe the function below me.
    * This function calls someone SUS!
    * @param person - The person who's gonna be sus.
    */
  function amongUs(person: any): void {
    console.log(`${person} is sus`);
  }
```
- No unused functions
- When you use an ESLint Ignore statement add an explanation.
### What happens when code is committed that does not follow the code conventions?
When code is committed that contains linting errors it will fail whilst running in the pipeline.
Your pull request will fail and can therefor not be pr'd back to dev or main.

## Git and Github rules
- Do not push directly to Dev or Main.
- Use Milestones for user stories.
- Use an issue per problem you'll tackle.
- Add corresponding Milestones (user stories) to your issue.
- Add fitting labels to your issue (bugfix, new feature, documentation etc.)
- For every new problem you'll solve you work on a different feature or bug-fix branch. (feature/stream-window, bug-fix/centered-div)
- When done with a branch create a pull request with your pushed branch.
- in the description write: Closes #Issue number of issue you've solved. This way Issues will automatically be closed after the pull request has been submitted.
- Every pull request needs at least one code review.
- Only use `feature` and `bug-fix` branches.
- Do your code reviews seriously.
- Do not review/submit pull requests that are still running CI tests.
- Assign yourself and other people if necessary to the assignee's tab in a pull request.
- Feel free to request reviewers in a pull request.
- Make sure not to commit big chunks of changes, commit in small steps.

# Working Lean
- Make use of the github projects kanban board.
- The boards can be found in this repo's projects tab > Projects (classic)
- Always assign yourself first before working on any tasks.
- Make sure to update the tasks status. (in progress, testing done)
- WIP-Limits:
    - Kanban-backlog 10
    - under development 6
    - under test 4
    - done (waiting for acceptance by PO) 3
    - accepted by PO ∞
