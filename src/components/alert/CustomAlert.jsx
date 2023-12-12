import React from 'react';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

const CustomAlert = ({ status, title, description }) => {
  return (
    <Alert status={status} variant="solid">
      <AlertIcon />
      <div>
        <AlertTitle mr={2}>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </div>
    </Alert>
  );
};

export default CustomAlert;