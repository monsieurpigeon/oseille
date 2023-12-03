import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';

interface Feature {
  title: string;
  description: string;
  user: {
    color: string;
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
              backgroundColor={feature.user.color}
              name={feature.user.name}
            />

            <Flex
              alignItems="center"
              gap={2}
            >
              <Heading size="sm">{feature.user?.name}</Heading>
              <Text>{feature.user?.farm}</Text>
            </Flex>
          </Flex>
        </a>
      </CardHeader>
      <CardBody>
        <Box>
          <Heading size="md">{feature.title}</Heading>
          <Text textAlign="justify">{feature.description}</Text>
        </Box>
      </CardBody>
    </Card>
  );
}
