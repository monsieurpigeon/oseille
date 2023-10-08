import { Button, Container, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Tool {
  label: string;
  path: string;
}

const TOOL_ITEMS: Tool[] = [{ label: 'Tickets de caisse', path: 'scale' }];

interface ToolCardProps {
  tool: Tool;
}

function ToolCard({ tool }: ToolCardProps) {
  const navigate = useNavigate();
  return (
    <Button
      className="clickable"
      onClick={() => navigate(tool.path)}
    >
      {tool.label}
    </Button>
  );
}

export function ToolPage() {
  return (
    <Container>
      <SimpleGrid
        columns={2}
        spacing={10}
      >
        {TOOL_ITEMS.map((tool) => {
          return (
            <ToolCard
              key={tool.path}
              tool={tool}
            />
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
