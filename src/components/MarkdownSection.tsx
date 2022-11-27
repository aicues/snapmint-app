import { useTranslation } from "next-i18next";
import { Card, Avatar, Button } from "react-daisyui";
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ReactDom from 'react-dom'

export const MarkdownSection: React.FC<{
  markdown: string;
  background: string;

}> = ({ markdown, background }) => {

  // Translations
  const { t } = useTranslation('common');

  /*
    const [mdContent, setMDContent] = useState("");
    useEffect(() => {
      fetch(markdown)
        .then((res) => res.text())
        .then((text) => setMDContent(text));
    }, []); 
    */




    

  return (
    <section className={`p-10 ${background} text-neutral-content`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Map `h1` (`# heading`) to use `h2`s.
          // h1: 'h2',
          h1: ({ node, ...props }) => 
            <h1 className='text-primary-content text-lg' {...props} />,
          // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
          em: ({ node, ...props }) => 
            <i style={{ color: 'red' }} {...props} />
        }}>
        {markdown}
      </ReactMarkdown>
    </section>

  );
};

export default MarkdownSection;