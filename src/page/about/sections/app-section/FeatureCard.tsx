import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';

interface Feature {
  title: string;
  description: string;
  user: {
    avatar: string;
    name: string;
    farm: string;
    link: string;
  };
}

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <a
          href={feature.user.link}
          target="_blank"
        >
          <Flex
            flex="1"
            gap="4"
            alignItems="center"
            flexWrap="wrap"
          >
            <Avatar
              onClick={() => console.log('click')}
              name={feature.user.name}
              src={feature.user?.avatar || 'https://bit.ly/sage-adebayo'}
            />

            <Box>
              <Heading size="sm">{feature.user?.name}</Heading>
              <Text>{feature.user?.farm}</Text>
            </Box>
          </Flex>
        </a>
      </CardHeader>
      <CardBody>
        <Box>
          <Heading size="md">{feature.title}</Heading>
          <Text>{feature.description}</Text>
        </Box>
      </CardBody>
    </Card>
  );
}
