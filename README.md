# Flipbook Viewer with Right-to-Left Navigation

## Overview

This project implements a flipbook viewer with right-to-left navigation using the iPaperJsApi. It retrieves the total pages, current spread, and spread details of a flipbook embedded in an iframe and displays the page information in reverse order (right to left). 

## Funtions and Variables

### `useEffect`

The `useEffect` hook in this component is responsible for initializing the flipbook and setting up the page tracking when the component is first rendered. Here's how it works:

- **Initialization**: The `initializeFlipbook` function is defined within the `useEffect` to set up the iPaperJsApi instance. It finds the flipbook iframe using `document.getElementById("Flipbook")` and initializes it with the `iPaperJsApi`.

- **Page State Setup**: The `initializeFlipbook` function also retrieves the initial state of the flipbook using `FlipbookInstance.paging.getState`. This function provides details like `totalPages`, `currentSpread`, and `spreads`, which are used to update the `pagesObject` state.

- **Page Change Handling**: The `FlipbookInstance.paging.onChange` function is set up to listen for page changes as the user navigates through the flipbook. When a page change occurs, it updates the `currentSpread` in the `pagesObject` state, ensuring that the displayed page number is accurate.

- **Fade-In Effect**: The `showFlipbook` function is called after initializing the flipbook, triggering a fade-in effect by setting `hasLoaded` to `true` after a 750ms delay.

#### `RToLFormatedPageNumber`

`RToLFormatedPageNumber` is a variable that formats the page number to display it in a right-to-left format, which is typical for content that reads from right to left.

- **Single Page Display**: If the `currentSpread` is `[0]`, which indicates no pages are being displayed, `RToLFormatedPageNumber` is set to an empty string.

- **Page Number Formatting**: For all other cases, it maps over the `currentSpread` array, converting each page number into its right-to-left equivalent. This is done by subtracting each page number from `totalPages` and then joining them with a `/` separator to create a string like "12/11" for a two-page spread.

#### Page Display in Custom Element

The page number is displayed in a custom element before the iframe containing the flipbook:

- **Page Display Container**: A `<div>` is used to create a header-like section at the top of the viewer. This section contains the page number information.

- **Page Number Element**: Inside this container, the text is places to represent the currect pages being displayed. The `RToLFormatedPageNumber` and `totalPages` are displayed here and divided by a hyphen.

- **Dynamic Updates**: As the user navigates through the flipbook, the `useEffect` and `onChange` listener ensure that the `RToLFormatedPageNumber` is updated dynamically, reflecting the correct current page(s) in the custom display element.

This setup allows the page number to be prominently displayed and continuously updated as the user interacts with the flipbook.
