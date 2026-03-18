import { Language, translations } from "@/data/translations";
import { getFootnoteExplanation } from "@/data/rulingCodes";

interface FooterProps {
  language: Language;
  activeFootnotes?: string[]; // Array of codes like ["HALAL*", "HALAL**"]
}

export default function Footer({ language, activeFootnotes = [] }: FooterProps) {
  const t = translations[language];

  // Filter to only footnotes that have explanations
  const footnotesWithExplanations = activeFootnotes.filter(
    (code) => getFootnoteExplanation(code, language) !== null
  );

  return (
    <footer className="mt-12 pt-8 border-t border-teal-700/50">
      {/* Footnotes - Only shown when there are active footnotes */}
      {footnotesWithExplanations.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-teal-300 mb-2">Footnotes</h3>
          <div className="space-y-1">
            {footnotesWithExplanations.map((code) => {
              const explanation = getFootnoteExplanation(code, language);
              if (!explanation) return null;
              return (
                <p key={code} className="text-xs text-teal-300">
                  <span className="font-medium text-teal-200">{code}</span> - {explanation}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* Sources - Paper Citation Style */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-teal-300 mb-2">{t.sources}</h3>
        <div className="space-y-2">
          <p className="text-xs text-teal-300">
            <span className="font-medium text-teal-200">{t.landAnimalsSources}:</span> Halal Food A History (Febe Armanios, Boğaç Ergene). Cook "Early Islamic Dietary Law," 259; Qasmi, Animal Slaughter, 24; "At&apos;ima," Al-Mawsu&apos;a al-Fiqhiyyah, 5:133-147.
          </p>
          <p className="text-xs text-teal-300">
            <span className="font-medium text-teal-200">{t.seaAnimalsSources}:</span> Halal Food A History (Febe Armanios, Boğaç Ergene). Cook "Islamic Dietary Law," 237-247; al-Mubarakfuri, Tuhfat al-Ahwadhi bi Sharh Jami&apos;al-Tirmidzi, 1:224-231; "At&apos;ima," Al-Mawsu&apos;a al-Fiqhiya, 5:127-132.
          </p>
        </div>
      </div>

      {/* Credit */}
      <div className="text-xs text-teal-400 font-semibold">
        {t.credit}{" "}
        <a
          href="https://twitter.com/gus_arifin"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-300 hover:text-teal-200 underline"
        >
          @gus_arifin
        </a>
      </div>
    </footer>
  );
}
