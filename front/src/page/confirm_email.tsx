// DATA
import { Route_Client } from "#data/links";
// REACT
import { useParams } from "react-router-dom";
import { useState, useEffect  } from "react";
// REQUEST
import { confirm_email } from "#/api/fetch_register_login"
// BUILDER
import Button from "#components/build/global/button";
import Typo from "#components/build/global/typography";
//
//
//
//
//
export default function Confirm_email() {
//
//
// VARIABLE
//
//    
    const { token } = useParams();
    const [result, setResult] = useState<string | null>(null);
//
//
// FUNCTION
//
//
    useEffect(() => {
        if (token) {
            confirm_email(token)
                .then((isConfirmed: string) => {
                         setResult(isConfirmed);
                })
                .catch((error) => {
                    console.error(error);
                    setResult("Erreur lors de la confirmation de l'email");
                });
        }
    }, [token]);
//
//
//
//
//
    return (
        <main className="comfirm_email">
            <section>
            <Typo
            balise="span"
            size="s7"
            color="cb"
            transform="maj"
            children={typeof result === 'string' ? result : ''}
            />
            <Button
            variant="t2"
            fontSize="s2"
            children="Accueil"
            href={Route_Client[0].url}
            type={Route_Client[0].type}
            />
            </section>
        </main>
    );
}
