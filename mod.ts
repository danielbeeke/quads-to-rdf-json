import { groupBy } from "https://deno.land/std@0.158.0/collections/group_by.ts";

type Term = {
  termType: string,
  value: string,
  language?: string,
  datatype?: Term
}

type Quad = {
  termType: string,
  value: string,
  subject: Term,
  predicate: Term,
  object: Term,
  graph: Term,
}

type RdfJsonTerm = {
  type: 'bnode' | 'uri' | 'literal' | 'defaultgraph',
  value: string,
  lang?: string,
  datatype?: string
}

const typeMapping = {
  'NamedNode': 'uri',
  'Literal': 'literal',
  'BlankNode': 'bnode',
  'DefaultGraph': 'defaultgraph'
} as const

/**
 * @See https://rdf.js.org/data-model-spec/
 * @See https://www.w3.org/TR/rdf-json/#overview-of-rdf-json
 * 
 * Maps Quads from the RDF data model spec to application/rdf+json
 */
export const convertQuadsToRdfJson = (quads: Array<Quad>) => {
  const root: {
    [key: string]: {
      [key: string]: Array<RdfJsonTerm>
    }
  } = {}
  const groupedSubjectQuads = groupBy(quads, (item: Quad) => item.subject.value)

  for (const subjectQuads of Object.values(groupedSubjectQuads)) {
    if (!subjectQuads) continue
    const subject = subjectQuads[0].subject.value

    root[subject] = {}
    const groupedPredicatesQuads = groupBy(subjectQuads, (item: Quad) => item.predicate.value)

    for (const predicateQuads of Object.values(groupedPredicatesQuads)) {
      if (!predicateQuads) continue
      
      const predicate = predicateQuads[0].predicate.value
      root[subject][predicate] = []

      for (const predicateQuad of predicateQuads) {
        
        if (!(predicateQuad.object.termType in typeMapping)) 
          throw new Error('Unexpected termType')

        const type = typeMapping[predicateQuad.object.termType as keyof typeof typeMapping]

        const value: RdfJsonTerm = {
          type,
          value: predicateQuad.object.value,
        }

        if (predicateQuad.object.language) {
          value.lang = predicateQuad.object.language
        }

        if (predicateQuad.object.datatype) {
          value.datatype = predicateQuad.object.datatype.value
        }

        root[subject][predicate].push(value)
      }
    }
  }

  return root
}