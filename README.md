# Shortener
https://shortener.obringer.net

## Overview
The shortener uses the following:
- NextJS 13 app folder, including new router and server components
- react-hook-form to manage form state and behavior
- Taiwind for layout
- ods-base for themeable components (my own component library/design system base)
  - react-aria (accessibility behaviors)
  - radix-ui (headless components)
- sass modules for more targeted styling of in app components
- `pnpm` for package management
- Playwright for Testing
- Vercel for Hosting


## Features
- Allows user to create new shortened link
- Link List View
  - Allows sorting asc/desc for created date and count
  - Allows searching by url or name
  - Selecting item routes to edit/info page for link
- Edit/Info page
  - Allows editing link, including optional friendly name
  - Allows deleting of link
  - Allows navigation to shortened link, incrementing count, and redirecting to full uri
  - Validates url and provides appropraite error state
- Fully responsive
- Fully accessible and navigable with keyboard exclusively
- Header download button to download JSON of current state of links
- Header reset button allows all data to be reset to original JSON

## Running Locally
```
git clone git@github.com:bob-obringer/shortener.git
cd shortener
pnpm install
pnpm dev
```

## Testing
Playwright end to end tests have been created to mirror user behavior.
```
pnpm e2e
```
#### Testing in Debug Mode
Playwright includes a debug mode that includes an inspector and ability to navigate through the tests.
```
pnpm e2e:debug
```

## Notes
### Application Layout
- NextJS 13's new `app` folder's router with nested layouts is well suited for this type of application even though it's not out of beta yet.  Bugs and quirks are generally easy to work around and worth the value of the `app` folder improvements.
- Most page specific components are located in the `src/app` folder.  Shared (or those designed to be) are in the `src/components` folder.
- Where possible, server components are used (without the "use client" directive) in order to minimize the size of the javascript bundle.
- NextJS 13 allows for "Route Groups" which allow routes in different groups to use different layouts.  In this case, `(shortener)` contains the routes and layouts for the main application UI, while `(redirect)` only contains the route for the actual short link address and redirector.
- The `(shortener)` group uses a new NextJS 13 trick in which both `/` and `/link/[shortId]` routes use the same layout without providing any markup of their own.  Some components inside this shared layout use the new `useSelectedLayoutSegments` to determine the specific route in which they are being rendered, and customize themselves accordingly.  This **MAY BE AN ANTIPATTERN** as the component shouldn't need to know about the route in which it's being rendered, but we're still figuring out these Next 13 app folder patterns.  In the case of higher level components which are only designed for certain routes, this might be ok and for an application of this size, it greatly simplified development.
- Most logic is contained within the ShortenedLinkContext.

### Styling / Themeing / Components
- `ods-base` is a library I've slowly been throwing together for personal projects.  This project has a few goals (which need to be better defined):
  - Provide a suite of fully themeable primative components
  - All components are fully accessible with minimal (no) overhead to the application 
  - Be minimially opinionated.  Consuming applications shouldn't have to fight their component library/design system when integrating.  Let the applications have opinions, not the library.
  - Nearly everything should be themeable via simple css variables.
  - Any number of color modes can be and applied to any section of the page just by setting a class
  - _**Provide a platform which enhances collaboration between design and engineering teams and allows them to rapidly develop a fully customized experience.**_
- `tailwind` is very developer friendly for application and feature layout.  Most primitives will be styled using `ods-base` but `tailwind` is great for arranging those components into an application.
- SASS modules are used for the most specific styling of application components which cannot be easily achieved with `ods-base` or `tailwind`.  Since they are built into NextJS, we get them almost for free.

The combination of these have been a great experience and made it easy to focus on rapidly delivering high quality features without spending much time on styling components.

### Testing
- End to end testing is done via `Playwright`.  It's been my very lightweight test automation platform for a few years.  Low overhead, fast, simple to set up, easy to run, and includes a nice inspector and other debugging tools.
- Tests should focus mostly on user behavior, end to end tests allow us to most accurately test the application as it is used in the real world.
- Unit and full mount component tests are not included here as functionality is generally covered by end to end tests.  They are more appropriate for shared code and components and covering edge cases that may be more difficult to test using full end to end tests.
- If unit and component tests were needed, `jest` would be the test runner, and `react-testing-library` would be used for mounting components.

## Known Issues
- Light mode is mostly working but colors still need work.  To manually switch to light mode, on the html tag change the `ods-dark-mode` class name to `ods-light-mode` (these can be applied to specific containers further down to mix modes)
- On mobile, if an item is deleted, it switches to "create" instead of flipping back to the list view.  Slightly weird UX
- Destroy buttons should have confirm dialogs
- Next 13 keeps adding a meta `viewport` tag which overwrites my own.  This causes a weird issue on mobile where tapping into a text field causes it to zoom.  I've tried removing the incorrect tag programatically but it still exhibits same bahavior.  Need to dig further into the cause and potential wordarounds.
- Next 13's server components are incompatible with React Context, preventing use of React Aria's SSR context provider.  This throws a lot of warnings to the console, and in some cases can cause an additional render during hydration.  Any performance impact is not noticable to the user.
- In Next 13's app folder, external packages which use client side features, are rendered as server components and fail. Since `ods-base` is an external client component library, a file has been created which is marked as a client component, and re-exports all components from `ods-base`.  These components can now be imported from `#/components/ods` and Next 13 treats them as client components.