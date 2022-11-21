import { CLIGen } from 'burst-generate-files';
import { path } from 'app-root-path';

CLIGen(path, [
    {
        name:      'Elements: ./src/elements/__elementName__',
        templates: [
            {
                stringsReplacers: '__elementName__',
                pathToTemplate:   './scripts/generate/templates/element',
                outputPath:       './src/elements/__elementName__(pascalCase)',
                markers:          [
                    {
                        pattern:        '// MarkerGen re-export',
                        pathToMarker:   './src/elements/index.ts',
                        markerTemplate: './scripts/generate/templates/element/.genignore/reExport.ts',
                    },
                    {
                        pattern:        '// MarkerGen import elements styles',
                        pathToMarker:   './src/main.scss',
                        markerTemplate: './scripts/generate/templates/element/.genignore/importStyles.ts',
                    },
                ],
            },
        ],
    },
    {
        name:      'Components: ./src/components/__componentName__',
        templates: [
            {
                stringsReplacers: '__componentName__',
                pathToTemplate:   './scripts/generate/templates/component',
                outputPath:       './src/components/__componentName__(pascalCase)',
                markers:          [
                    {
                        pattern:        '// MarkerGen re-export',
                        pathToMarker:   './src/components/index.ts',
                        markerTemplate: './scripts/generate/templates/component/.genignore/reExport.ts',
                    },
                    {
                        pattern:        '// MarkerGen import components styles',
                        pathToMarker:   './src/main.scss',
                        markerTemplate: './scripts/generate/templates/component/.genignore/importStyles.ts',
                    },
                ],
            },
        ],
    },
]);
