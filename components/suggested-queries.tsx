import { motion } from "framer-motion";
import { Button } from "./ui/button";

export const SuggestedQueries = ({
  handleSuggestionClick,
}: {
  handleSuggestionClick: (suggestion: string) => void;
}) => {
  const suggestionQueries = [
    {
      desktop: "What was Wilson's maximum volume per hour?",
      mobile: "Maximun volume",
    },
    {
      desktop: "What was Wilson's minimum flow per hour?",
      mobile: "Maximun flow",
    },
    {
      desktop: "What was the last time that Wilson was working?",
      mobile: "Last time working",
    },
    {
      desktop: "How many cycles per hour?",
      mobile: "Cycles/h",
    },
    {
      desktop: "When did Wilson reach maximum flow?",
      mobile: "Cycles/h",
    },
    {
      desktop: "On which hours was Wilson working?",
      mobile: "Working hours",
    },
  ];

  return (
    <motion.div
      key="suggestions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
        Try these queries:
      </h2>
      <div className="flex flex-wrap gap-2">
        {suggestionQueries.map((suggestion, index) => (
          <Button
            key={index}
            className={index > 5 ? "hidden sm:inline-block" : ""}
            type="button"
            variant="outline"
            onClick={() => handleSuggestionClick(suggestion.desktop)}
          >
            <span className="sm:hidden">{suggestion.mobile}</span>
            <span className="hidden sm:inline">{suggestion.desktop}</span>
          </Button>
        ))}
      </div>
    </motion.div>
  );
};
