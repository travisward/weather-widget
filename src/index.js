/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks'
import { RichText } from '@wordpress/block-editor';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss'

/**
 * Internal dependencies
 */
import Edit from './edit'

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType('ama/weather', {
	title: 'The AMA Weather Block',
	category: 'common',
	attributes: {
		titleText: {
			type: 'array',
			selector: 'h2',
		},
		weatherText: {
			type: 'array',
			selector: '.weather_text',
		}
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: ( props ) => {
		const {
			className,
			attributes: { titleText, weatherText },
		} = props;
		return (
			<div className={ className }>
				<RichText.Content tagName="h2" value={ titleText } />
				<RichText.Content tagName="p" className="weather_text" value={ weatherText }
				/>
			</div>
		);
	},


})
