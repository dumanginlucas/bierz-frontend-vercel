import React from 'react';

const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=5515991474614';

function WhatsAppButton() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
      Falar no WhatsApp
    </a>
  );
}

export default WhatsAppButton;
