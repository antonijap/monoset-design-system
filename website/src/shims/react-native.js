// Docs-only 'react-native' entry: everything from react-native-web, except
// Modal, which portals into the PhonePreview frame instead of covering the
// whole site. See PhoneModal.jsx.
export * from 'react-native-web'
export { default as Modal } from './PhoneModal.jsx'
