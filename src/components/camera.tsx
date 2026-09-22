// import React, { useEffect } from 'react'
// import { Camera, useCameraPermission, usePhotoOutput } from 'react-native-vision-camera'

// export default function CameraBlock() {
//   const { hasPermission, requestPermission } = useCameraPermission()
//   const photoOutput = usePhotoOutput()

//   useEffect(() => {
//     if (!hasPermission) requestPermission()
//   }, [hasPermission, requestPermission])

//   return (
//     <Camera
//       style={{ flex: 1 }}
//       isActive={true}
//       device="back"
//       outputs={[photoOutput]}
//     />
//   )
// }