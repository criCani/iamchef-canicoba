import '../styles/components/RecipeInstructionsSection.css';
import IconifyIcon from '../utils/IconifyIcon';

type Step = {
  number: number;
  step: string;
};

type AnalyzedInstruction = {
  steps: Step[];
};

type RecipeInstructionsSectionProps = {
  analyzedInstructions?: AnalyzedInstruction[];
  instructionsHtml?: string;
};

export const RecipeInstructionsSection = ({ analyzedInstructions = [], instructionsHtml }: RecipeInstructionsSectionProps) => {
  return (
    <section className="full-recipe__section">
      <h2 className="full-recipe__section-title">
        <span className="full-recipe__section-icon"><IconifyIcon icon="mdi:book-open" width="1.5em" height="1.5em" /></span>
        Istruzioni
      </h2>
      <div className="full-recipe__instructions">
        {analyzedInstructions && analyzedInstructions.length > 0 && analyzedInstructions[0].steps.map((step) => (
          <div key={step.number} className="full-recipe__step">
            <span className="full-recipe__step-number">{step.number}</span>
            <span className="full-recipe__step-text">{step.step}</span>
          </div>
        ))}
        {(!analyzedInstructions || analyzedInstructions.length === 0) && instructionsHtml && (
          <div className="full-recipe__instructions-html" dangerouslySetInnerHTML={{ __html: instructionsHtml }} />
        )}
      </div>
    </section>
  );
};

export default RecipeInstructionsSection;
