'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const switchLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2, 
        mt: 2, 
      }}
    >
      <Button
        variant={i18n.language === 'ru' ? 'contained' : 'outlined'} 
        onClick={() => switchLanguage('ru')}
        sx={{
          borderRadius: 20, 
          textTransform: 'none',
          minWidth: 100,
        }}
      >
        Русский
      </Button>
      <Button
        variant={i18n.language === 'en' ? 'contained' : 'outlined'} 
        onClick={() => switchLanguage('en')}
        sx={{
          borderRadius: 20, 
          textTransform: 'none', 
          minWidth: 100,
        }}
      >
        English
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
