# facets
*PLACEHOLDER* Customer tracking, work order management and scheduling, workforce management, invoicing, and analytics for service-based small businesses

## Installing facets (*nix)
Installing facets in a *nix system is accomplished through the the use of a `bash` shell. Installation on other platforms is currently a manual process.

### Prerequisites
facets requires __Node.js__ (v10+) and __MongoDB__ (v4+) to operate. Please ensure these are installed before beginning the facets installation.

### Install Script
Run the included `install.sh` script with the desired environment argument:
  - __l__ for Local
  - __d__ for Development
  - __q__ for QA
  - __p__ for Production

  Example (_local install_): 
  ```bash 
  ./install.sh l
  ```
## Starting facets
1) Use the database start script located in the `bin` directory to start the database.
```bash
./bin/startDb.sh
```
2) Use the component start script located in the `bin` directory to start the Web and Server components.
```bash
./bin/startComponents.sh
```

