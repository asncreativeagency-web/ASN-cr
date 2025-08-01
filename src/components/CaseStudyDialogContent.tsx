import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const CaseStudyDialogContent = ({ caseId, caseStudies }) => {
  const study = caseStudies.find(s => s.id === caseId);
  if (!study) return null;

  return (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="asn-headline text-2xl">{study.title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-8">
        {/* Image */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img 
            src={study.image} 
            alt={study.title}
            loading="lazy"
            className="w-full h-full object-cover filter grayscale"
          />
        </div>
        {/* Client & Tags */}
        <div className="flex items-center justify-between">
          <h3 className="asn-headline text-xl">{study.client}</h3>
          <div className="flex gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
        </div>
        {/* Description */}
        <p className="asn-body text-lg text-muted-foreground">{study.description}</p>
        {/* Challenge, Solution, Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h4 className="asn-headline text-lg text-foreground">Challenge</h4>
            <p className="asn-body text-muted-foreground">{study.challenge}</p>
          </div>
          <div className="space-y-4">
            <h4 className="asn-headline text-lg text-foreground">Solution</h4>
            <p className="asn-body text-muted-foreground">{study.solution}</p>
          </div>
          <div className="space-y-4">
            <h4 className="asn-headline text-lg text-foreground">Results</h4>
            <ul className="space-y-2">
              {study.results.map((result, index) => (
                <li key={index} className="asn-body text-muted-foreground flex items-center space-x-2">
                  <div className="h-2 w-2 bg-foreground rounded-full flex-shrink-0"></div>
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default CaseStudyDialogContent; 