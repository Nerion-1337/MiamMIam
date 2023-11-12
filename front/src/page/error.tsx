// DATA
import { Route_Client } from "#data/links";
// BUILDER
import Navlinks from "#components/build/global/navlink";
import Typo from "#components/build/global/typography";
// TYPAGE
import { error } from "#types/typages";
//
//
//
export default function Error({
  id = "404",
  errorText = "Oups! La page que vous demandez n'existe pas.",
  nolink,
}: error) {
  //
  //
  const home = Route_Client.find((Links) => {
    return Links.label === "home";
  });
  //
  // BUILD
  const errorContent = (
    <>
      <section className="error">
        <Typo size="s0" balise="span" color="c7">
          {id}
        </Typo>

        <Typo size="s3" balise="span" color="c6">
          {errorText}
        </Typo>

        <Navlinks href={home.url} type={home.type}>
          <Typo size="s5" balise="span" color="c3" className="backHomeError404">
            Retourner sur la page d’accueil
          </Typo>
        </Navlinks>
      </section>
    </>
  );
  //
  const errorContentApp = (
    <>
      <section className="error">
        <Typo size="s0" balise="span" color="c7">
          {id}
        </Typo>

        <Typo size="s3" balise="span" color="c6">
          {errorText}
        </Typo>
      </section>
    </>
  );
  //
  //

  return (
    <>
      {home ? <>{nolink ? errorContentApp : errorContent}</> : <h1>Fail Link</h1>}
    </>
  );
}
