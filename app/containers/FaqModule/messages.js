/*
 * FaqModule Messages
 *
 * This contains all the text for the FaqModule container.
 */

import { defineMessages } from "react-intl";

export const scope = "app.containers.FaqModule";

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: "This is the FaqModule container!"
  },
  addFaq:{
    id: `${scope}.addFaq`,
    defaultMessage: "Add FAQ"
},editFaq:{
    id: `${scope}.editFaq`,
    defaultMessage: "EDIT FAQ"
},addNewFaq:{
    id: `${scope}.addNewFaq`,
    defaultMessage: "ADD NEW FAQ"
},faqQuestion:{
    id: `${scope}.faqQuestion`,
    defaultMessage: "FAQ Question"
},faqAnswer:{
    id: `${scope}.faqAnswer`,
    defaultMessage: "FAQ Answer"
},cancel:{
    id: `${scope}.cancel`,
    defaultMessage: "Cancel"
},submit:{
    id: `${scope}.submit`,
    defaultMessage: "Submit"
},deleteThisFaq:{
    id: `${scope}.deleteThisFaq`,
    defaultMessage: "Delete this FAQ?"
},delete:{
    id: `${scope}.delete`,
    defaultMessage: "Delete"
},
  faq1: {
    id: `${scope}.faq1`,
    defaultMessage: "1. Want to know more about CMOS 360 application ? "
  },
  faq2: {
    id: `${scope}.faq2`,
    defaultMessage: "2. Want to know more about IPM application ? "
  },
  faq3: {
    id: `${scope}.faq3`,
    defaultMessage: "3. Want to know more about Data Engine application ? "
  },
  faq4: {
    id: `${scope}.faq4`,
    defaultMessage: "4. Want to know more about FP & A application ? "
  },
  answer1: {
    id: `${scope}.answer1`,
    defaultMessage: "This app helps you...\n " +
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,\n" +
        "              sit amet blandit leo lobortis eget."
  }
});
