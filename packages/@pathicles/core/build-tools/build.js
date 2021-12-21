import { build } from 'esbuild';
import esbuildPluginGlslifyMinify from '@befunky/esbuild-plugin-glslify-minify';


build({
	entryPoints: ['src/index.ts'],
	// outfile: 'dist/index.js',
	outdir: 'dist',
  outExtension: { '.js': '.mjs' },
	mainFields: ['module', 'main'],
	target: [
		'es2018'
	],
	// sourcemap: true,
	bundle: true,
	// minify: true,
	plugins: [esbuildPluginGlslifyMinify({
		// What extensions to compile. Defaults:
		extensions: ['vs', 'fs', 'vert', 'frag', 'glsl'],

		// Glslify options
		// See https://github.com/glslify/glslify#var-src--glslcompilesrc-opts
		glslify: {
			basedir: './helpers',
		},

		// Minification options 
		// See https://github.com/leosingleton/webpack-glsl-minify#loader-options
		minify: {
			preserveUniforms: true,
			preserveDefines: true,
			removeGlslifyDefinition: true, // Removes "#define GLSLIFY 1", false by default
		},

		// To avoid minification, omit the config or set it to a falsy value, e.g.
		minify: false,

	})],
}).catch(e => {
	console.error(e);
	process.exit(1);
});