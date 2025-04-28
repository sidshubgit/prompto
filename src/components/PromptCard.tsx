
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Copy, Star } from 'lucide-react';

export interface PromptTemplate {
  id: string;
  title: string;
  template: string;
  useCaseTags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  upvotes: number;
  keywords: string[];
  description?: string;
}

interface PromptCardProps {
  prompt: PromptTemplate;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(prompt.upvotes);
  const [expanded, setExpanded] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(prompt.template);
    toast.success('Copied to clipboard!');
  };

  const handleUpvoteClick = () => {
    if (!isUpvoted) {
      setUpvotes(prev => prev + 1);
      setIsUpvoted(true);
      toast.success('Prompt upvoted!');
    } else {
      setUpvotes(prev => prev - 1);
      setIsUpvoted(false);
    }
  };

  // Truncate the prompt template if it's too long
  const displayTemplate = expanded ? prompt.template : 
    prompt.template.length > 180 ? `${prompt.template.substring(0, 180)}...` : prompt.template;

  return (
    <Card className="prompt-card animate-expand">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-start">
          <span className="text-xl font-semibold text-promptforge-purple">{prompt.title}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleUpvoteClick}
            className={`flex items-center gap-1 ${isUpvoted ? 'text-amber-500' : 'text-gray-400'}`}
          >
            <Star className="h-4 w-4" />
            <span>{upvotes}</span>
          </Button>
        </CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {prompt.useCaseTags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="prompt-tag">
              {tag}
            </Badge>
          ))}
          <Badge 
            variant="outline" 
            className={`prompt-tag ${
              prompt.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : 
              prompt.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}
          >
            {prompt.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary p-4 rounded-md text-sm whitespace-pre-wrap">
          {displayTemplate}
        </div>
        {prompt.template.length > 180 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-xs" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Read more'}
          </Button>
        )}
        {prompt.description && (
          <p className="text-sm text-muted-foreground mt-3">{prompt.description}</p>
        )}
      </CardContent>
      <CardFooter className="pt-3">
        <Button onClick={handleCopyClick} className="copy-button w-full flex gap-2">
          <Copy className="h-4 w-4" />
          Copy Prompt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
