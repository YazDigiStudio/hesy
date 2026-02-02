// Contact page - contact information

import { PageContent } from '../components/PageContent';

type ContactPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function ContactPage({ language }: ContactPageProps) {
  const contentFile = `pages/${language}/contact.md`;
  return <PageContent contentFile={contentFile} language={language} />;
}
