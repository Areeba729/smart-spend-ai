// CustomBackDrop.js
import React, { memo } from 'react';
import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';

/**
 * IMPORTANT: your custom backdrop MUST forward the props it receives.
 * If you don't spread {...props}, the overlay won't animate / render correctly.
 */
const CustomBackDrop = props => {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
      opacity={0.6}
    />
  );
};

export default memo(CustomBackDrop);
