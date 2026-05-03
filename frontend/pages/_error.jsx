import * as Sentry from "@sentry/nextjs";
import NextErrorComponent from "next/error";

const ErrorPage = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }
  return <NextErrorComponent statusCode={statusCode} />;
};

ErrorPage.getInitialProps = async (contextData) => {
  const { res, err, asPath } = contextData;
  const errorInitialProps = await NextErrorComponent.getInitialProps(contextData);
  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) return { statusCode: 404 };

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);
    return errorInitialProps;
  }

  Sentry.captureException(new Error(`_error.jsx — missing data at path: ${asPath}`));
  await Sentry.flush(2000);
  return errorInitialProps;
};

export default ErrorPage;
