
# `FileBrowser` props

| Property             | Type     | Default value | Description                                                                                                                                                                                             |
|----------------------|----------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `files`              | Array    | *None*        | An array of file objects. This determines which files are displayed in the main container. This is the only **required** property. See **Passing files to Chonky** section.                             |
| `folderChain`        | Array    | *None*        | An array of file objects. This determines the current folder hierarchy, and is displayed in the status bar. See **Specifying current folder** section.                                                  |
| `doubleClickDelay`   | Number   | `300`         | The maximum number of milliseconds between the two clicks in a double-click.                                                                                                                            |
| `onFileSingleClick`  | Function | *None*        | File click handler. This function is called when a file in the main container is clicked once. See **Handling file actions** section.                                                                   |
| `onFileSingleClick`  | Function | *None*        | File click handler. This function is called when a file in the main container is double-clicked. See **Handling file actions** section.                                                                 |
| `onFileOpen`         | Function | *None*        | File action handler. This function is called when a file in the main container is double-clicked, and also when a folder item in the status bar is clicked once. See **Handling file actions** section. |
| `onSelectionChange`  | Function | *None*        | Selection handler. This function is called whenever the file selection changes. See **Managing file selection** section.                                                                                |
| `thumbnailGenerator` | Function | *None*        | File thumbnail generator. This function is called to retrieve thumbnails for the files in the main container. See **Displaying file thumbnails** section.                                               |
| `disableSelection`   | Boolean  | `false`       | Flag that completely disables file selection functionality in the file browser. See **Managing file selection** section.                                                                                |
| `view`               | String   | `details`     | A string from the `FolderView` enum. It determines the initial file view that the user sees. See **Setting file browser options** section.                                                              |
| `options`            | Object   | *None*        | An `Options` object. Object used to set some of the internal file browser options. See **Setting file browser options** section.                                                                        |
| `sortProperty`       | String   | `name`        | A string from the `SortProperty` enum. It determines the file property that is used sort files. See **Setting file browser options** section.                                                           |
| `sortOrder`          | String   | `asc`         | A string from the `SortOrder` enum. It determines whether files should be shown in ascending or descending order of `sortProperty`. See **Setting file browser options** section.                       |