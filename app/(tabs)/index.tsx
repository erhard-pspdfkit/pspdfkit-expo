import React, { useRef } from 'react';
import { NativeModules, Platform } from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';

const PSPDFKit = NativeModules.PSPDFKit;
PSPDFKit.setLicenseKey(null);
const DOCUMENT =
	Platform.OS === 'ios'
		? 'Quickstart_Guide.pdf'
		: 'file:///android_asset/Quickstart_Guide.pdf';

export default function PSPDFKitDemo() {
	const pdfRef = useRef<PSPDFKitView | null>(null);

	return (
		<PSPDFKitView
			document={DOCUMENT}
			configuration={{
				showThumbnailBar: 'scrollable',
				pageTransition: 'scrollContinuous',
				scrollDirection: 'vertical',
			}}
			ref={pdfRef}
			fragmentTag="PDF1"
			style={{ flex: 1 }}
		/>
	);
}