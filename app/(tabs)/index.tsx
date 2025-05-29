import * as FileSystem from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { NativeModules, Platform } from 'react-native';
import PSPDFKitView from 'react-native-pspdfkit';

const PSPDFKit = NativeModules.PSPDFKit;
PSPDFKit.setLicenseKey(null);

const SOURCE_DOCUMENT = 'checklist.pdf';

export default function PSPDFKitDemo() {
	const pdfRef = useRef<PSPDFKitView | null>(null);
	const [documentPath, setDocumentPath] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function prepareDocument() {
			try {
				const destinationPath = `${FileSystem.documentDirectory}${SOURCE_DOCUMENT}`;
				
				// Check if file already exists in the destination
				const fileInfo = await FileSystem.getInfoAsync(destinationPath);
				
				if (!fileInfo.exists) {
					if (Platform.OS === 'ios') {
						// For iOS, copy from main bundle
						const sourcePath = `${FileSystem.bundleDirectory}${SOURCE_DOCUMENT}`;
						await FileSystem.copyAsync({
							from: sourcePath,
							to: destinationPath
						});
					} else {
						// For Android, copy from assets
						await FileSystem.copyAsync({
							from: `${FileSystem.bundleDirectory}${SOURCE_DOCUMENT}`,
							to: destinationPath
						});
					}
				}
				
				setDocumentPath(destinationPath);
			} catch (error) {
				console.error('Error preparing document:', error);
			} finally {
				setIsLoading(false);
			}
		}

		prepareDocument();
	}, []);

	if (isLoading || !documentPath) {
		return null; // Or return a loading indicator
	}

	return (
		<PSPDFKitView
			document={documentPath}
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