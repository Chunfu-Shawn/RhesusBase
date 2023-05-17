import React from 'react';
import HelpLayout from "../../components/Help/HelpLayout";
import HelpQA from "../../components/Help/QA.js";

export default function QA() {
    return (
        <HelpLayout opened={['manual']} selected={'Q&A'}>
            <HelpQA></HelpQA>
        </HelpLayout>
    )
}