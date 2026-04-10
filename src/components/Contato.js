import React from 'react';

const PHONE_LABEL = '(15) 99147-4614';
const WHATSAPP_URL = 'https://wa.me/5515991474614';

function Contato() {
  return (
    <div>
      <p>{PHONE_LABEL}</p>
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
        {WHATSAPP_URL}
      </a>
    </div>
  );
}

export default Contato;
