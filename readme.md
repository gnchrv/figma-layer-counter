# Figma Plugin Boilerplate

This is a small template one can use to create a Figma plugin. It relies on Webpack to compile TypeScript code into `.js`-files and currently doesn't concern about a GUI (probably will add it later). Suits very well to quickly create utility plguins without a graphic interface. 

## How to use
1. Install all developer dependecies using `npm install -D` command
2. In Figma, go to `Plugins` → `Development` → `New Plugin…`. Specify your plugin's name, click “Continue“, choose any of the three options and save it somewhere.
3. In the saved folder, find `manifest.json` and copy an `id` value. Put it in the `manifest.json` stored in this project.
4. In Figma, go to `Plugins` → `Manage Plugins…`, find the plugin you created and remove it. Then, open once again `New Plugin…` window, click in the dashed area below the “Link existing plugin“ label and specify `manifest.json` *stored in this project*.
5. Write some code, save it and build using either `npm run build` or `npm run watch` command.