import Standing from "../../domainObjects/league/standing"

// kesken, tätä ei voi tehdä loppuun ennen kuin saatavilla a:n ja b:n keskinäiset ottelut...
export const compareStandings = (a: Standing, b: Standing): number => {
    if (a.points !== b.points) {
        return b.points - a.points;
    }

    return 0;
}