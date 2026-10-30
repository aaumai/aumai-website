import React from 'react';
import { WHATSAPP_COUNTRIES, whatsappCountry } from '../data/whatsappCountries';

/**
 * "WhatsApp number" with a country picker in front (owner 2026-10-30). The number is sent as typed with
 * `whatsapp_country`; the site backend turns it into the full international number and checks its length.
 * The example under the label follows the country, so a UAE visitor sees "50 123 4567", not an Indian one.
 */
export default function WhatsAppNumberField({ value, country, onNumber, onCountry, inputClassName, autoFocus }) {
  const c = whatsappCountry(country);
  return (
    <label>
      WhatsApp number
      <span style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
        <select
          aria-label="Country"
          value={c.code}
          onChange={(e) => onCountry(e.target.value)}
          className={inputClassName}
          style={{ flex: '0 0 auto', width: 'auto', minWidth: 0, paddingRight: 8 }}
        >
          {WHATSAPP_COUNTRIES.map((x) => <option key={x.code} value={x.code}>{x.flag} +{x.dial}</option>)}
        </select>
        <input
          className={inputClassName}
          style={{ flex: '1 1 auto', minWidth: 0 }}
          type="tel" inputMode="tel" value={value} onChange={(e) => onNumber(e.target.value)}
          placeholder={c.example} autoComplete="tel-national" autoFocus={autoFocus} required
        />
      </span>
    </label>
  );
}
