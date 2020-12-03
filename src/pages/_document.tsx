import Document, { Html, Head, Main, NextScript } from 'next/document'

const APP_NAME = 'Jornada Solar'
const APP_DESCRIPTION = 'Uma jornada para homens mais inteiros'

export default class extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang='en' dir='ltr'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='application-name' content={APP_NAME} />
          <meta name='description' content={APP_DESCRIPTION} />
          <meta name='theme-color' content='#000000' />

          <link rel='manifest' href='/manifest.json' />
          <link href='/icons/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
          <link href='/icons/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
          <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
          <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
