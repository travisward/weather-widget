/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { withSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
	const {
			className,
			attributes: { titleText, weatherText },
			setAttributes,
		} = props;

	const onChangeTitle = ( value ) => {
		setAttributes( { titleText: value } );
	};
		
	var state = {
		weather_data: [],
		loading: true
	}

	wp.apiFetch({
			path: 'ama-weather/v1/weather/',
		}).then(data => {
			
			state = {
				weather_data: data,
				loading: false,
			};

			props.setAttributes( {
				weatherText: data
			} )

		});

	return (
		<div { ...useBlockProps() }>
			<RichText
					tagName="h2"
					placeholder={ __(
						'Title',
						'ama-weather'
					) }
					value={ titleText }
					onChange={ onChangeTitle }
				/>
			<RichText
					tagName="p"
					className="weather_text"
					placeholder={ __(
						'Weather',
						'ama-weather'
					) }
					value={ weatherText }
				/>
		</div>
	);
}
