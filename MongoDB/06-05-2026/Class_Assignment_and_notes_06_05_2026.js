//! Index:---
// INdex is data structure that stores only small portion of 
//collection data in a easy search ordered format
//ex:-- Before reading book ,index help u to find any topics easily


//? Why do we need Index:--
// without index,it will scan entire collection-->COLLSCAN(COLLECTION SCAN)
db.emp.find()
//WITH index--> data will be scanned in sorted index structured-->IXSCAN(INDEX SCAN)


//EXAMPLE:--
// collection--[D1,E2,R4,T6,U7]
db.emp.find({name:'U7'})
//before we get the data,it scans entire collection---->COLLSCAN

// with Index:---
//with help of index-->ascending/descending-->IXSCAN
//after the index creation-->D1,E2,R4,T6,U7(ASC),U7,T6,R4,E2,D1(DESC)



//? How to Check Index performance
//Syntax:---
db.collectionName.find({fieldName:'value'}).explain('executionStats')

//Display Honor Details in emp collection.
db.emp.find({ename:"Honor"}).explain('executionStats')
/*
executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 4,
    totalKeysExamined: 0,
    totalDocsExamined: 1000, //-->1000 docs scanned
    executionStages: {
      isCached: false,
      stage: 'COLLSCAN',
      filter: { ename: { '$eq': 'Honor' } },
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      works: 1001,
      advanced: 1,
      needTime: 999,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 1000
    }
  }
*/
//! Types of Indexes:--
/*
1.SINGLE FIELD index 
2.COMPOUND FIELD INDEX
3.MULTI KEY INDEX
4.DEFAULT INDEX
*/


//? 1. SINGLE FIELD INDEX:-----

//?HOW TO CREATE AN SINGLE FIELD INDEX:---
//syntax:---
db.collectionName.createIndex({fieldName:sorting})

//Display Honor Details in emp collection.
db.emp.createIndex({ename:1})
// ename_1--->index Name
//?with index scanning:--
db.emp.find({ename:"Honor"}).explain('executionStats')

/*
executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 5,
    totalKeysExamined: 1,
    totalDocsExamined: 1,
    executionStages: {
      isCached: false,
      stage: 'FETCH',
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      works: 2,
      advanced: 1,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 1,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 1,
        executionTimeMillisEstimate: 0,
        works: 2,
        advanced: 1,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { ename: 1 },
        indexName: 'ename_1',
        isMultiKey: false,
        multiKeyPaths: { ename: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { ename: [ '["Honor", "Honor"]' ] },
        keysExamined: 1,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  }
    */
//? HOW TO SEE INDEXES IN Collection:--
//syntax:---
db.collectionName.getIndexes()

db.emp.getIndexes()
//ename_1--->index Name

//?   HOW TO DROP THE INDEX:---

//? DROP PARTICULAR INDEX:--
//syntax:---
db.collectionName.dropIndex("indexName")

db.emp.dropIndex("ename_1")
//ex:---
M6> db.emp.dropIndex("ename_1")
//{ nIndexesWas: 2, ok: 1 }
M6> db.emp.getIndexes()
[ { v: 2, key: { _id: 1 }, name: '_id_' } ]

//? DROPPPING ALL INDEXES:--
db.collectionName.dropIndexes()
M6> db.emp.dropIndexes()
// {
//   nIndexesWas: 1,
//   msg: 'non-_id indexes dropped for collection',
//   ok: 1
// }

//! 2. COMPOUND FIELD INDEX:--
//creating indexes more than one field 
//syntax:--
db.collectionName.createIndex({fieldName1:sorting,fieldName1:sorting})


//Create an compound indexes on both salary in descending and deptno in ascending
db.emp.createIndex({sal:-1,deptno:1})

// sal_-1_deptno_1
M6> db.emp.getIndexes()
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { sal: -1, deptno: 1 }, name: 'sal_-1_deptno_1' }
]


//! 3. MULTI-KEY INDEX(ARRAY INDEX):---
//It is used to create index on Array fields in a collection
db.skills.insertMany([
  { name: "Ajay", skills: ["C","Java"] },
  { name: "Bhavi", skills: ["Python","MongoDB"] },
  { name: "Charu", skills: ["React","NodeJS"] }
])

db.skills.createIndex({ skills: 1 })
Jaipur> db.skills.find({skills:"Java"}).explain('executionStats')
// {
//   explainVersion: '1',
//   queryPlanner: {
//     namespace: 'Jaipur.skills',
//     parsedQuery: { skills: { '$eq': 'Java' } },
//     indexFilterSet: false,
//     queryHash: 'CF652545',
//     planCacheShapeHash: 'CF652545',
//     planCacheKey: '811F0374',
//     optimizationTimeMillis: 0,
//     maxIndexedOrSolutionsReached: false,
//     maxIndexedAndSolutionsReached: false,
//     maxScansToExplodeReached: false,
//     prunedSimilarIndexes: false,
//     winningPlan: {
//       isCached: false,
//       stage: 'FETCH',
//       nss: 'Jaipur.skills',
//       inputStage: {
//         stage: 'IXSCAN',
//         nss: 'Jaipur.skills',
//         keyPattern: { skills: 1 },
//         indexName: 'skills_1',
//         isMultiKey: true,
//         multiKeyPaths: { skills: [ 'skills' ] },
//         isUnique: false,
//         isSparse: false,
//         isPartial: false,
//         indexVersion: 2,
//         direction: 'forward',
//         indexBounds: { skills: [ '["Java", "Java"]' ] }
//       }
//     },
//     rejectedPlans: []
//   },
//   executionStats: {
//     executionSuccess: true,
//     nReturned: 1,
//     executionTimeMillis: 0,
//     totalKeysExamined: 1,
//     totalDocsExamined: 1,
//     executionStages: {
//       isCached: false,
//       stage: 'FETCH',
//       nReturned: 1,
//       executionTimeMillisEstimate: 0,
//       works: 2,
//       advanced: 1,
//       needTime: 0,
//       needYield: 0,
//       saveState: 0,
//       restoreState: 0,
//       isEOF: 1,
//       nss: 'Jaipur.skills',
//       docsExamined: 1,
//       alreadyHasObj: 0,
//       inputStage: {
//         stage: 'IXSCAN',
//         nReturned: 1,
//         executionTimeMillisEstimate: 0,
//         works: 2,
//         advanced: 1,
//         needTime: 0,
//         needYield: 0,
//         saveState: 0,
//         restoreState: 0,
//         isEOF: 1,
//         nss: 'Jaipur.skills',
//         keyPattern: { skills: 1 },
//         indexName: 'skills_1',
//         isMultiKey: true,
//         multiKeyPaths: { skills: [ 'skills' ] },
//         isUnique: false,
//         isSparse: false,
//         isPartial: false,
//         indexVersion: 2,
//         direction: 'forward',
//         indexBounds: { skills: [ '["Java", "Java"]' ] },
//         keysExamined: 1,
//         seeks: 1,
//         dupsTested: 1,
//         dupsDropped: 0,
//         peakTrackedMemBytes: 8
//       }
//     }
//   },
//   queryShapeHash: 'C25D88EF406BEC63DC19A5CCC1AD21D06739D9955A14B9A5C2291CFACDA93168',
//   peakTrackedMemBytes: Long('8'),
//   command: { find: 'skills', filter: { skills: 'Java' }, '$db': 'Jaipur' },
//   serverInfo: {
//     host: 'DESKTOP-78J2HGM',
//     port: 27017,
//     version: '8.3.1',
//     gitVersion: '094e631246d5b5bee5bd5f20b12f882bc8e286ea'
//   },
//   serverParameters: {
//     internalQueryFacetBufferSizeBytes: 104857600,
//     internalDocumentSourceGroupMaxMemoryBytes: 104857600,
//     internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
//     internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
//     internalQueryFacetMaxOutputDocSizeBytes: 104857600,
//     internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
//     internalQueryProhibitBlockingMergeOnMongoS: 0,
//     internalQueryMaxAddToSetBytes: 104857600,
//     internalQueryFrameworkControl: 'trySbeRestricted',
//     internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
//   },
//   ok: 1
// }

//Create index on items in orders collection
db.orders.createIndex({items:1})



//! 4. DEFAULT INDEX:----
//? the index which is created by System itself 
// ? for every collection by _id field with index name --> _id_

// Charcaterstics of Default index:--
/*
1.it fasts your searches
2.We cant drop the Default index.
3.If u drop the collection ,then default index for that collection also get droppped.
4.The type ofthis index is --> unique index-->which provide all ids are unique
*/



//! Nesting index:---
//? It is called nested index or Embedded index
// This index is created on sub-documents
//  { ///this entire fields is documnets--wrapping one object on another object
//     customer: 'Amit',
//     //items is a sub document-->Nested document
//     items: [
//       { product: 'Pen', qty: 10, price: 20 },
//       { product: 'Book', qty: 2, price: 200 },
//       { product: 'Pencil', qty: 5, price: 10 }
//     ],
//     tags: [ 'stationery', 'school', 'low-price' ]
//   }
//? How to create nested index:--
db.collectionName.createIndex({"embededdoc.nestedfield":soring})


db.orders.createIndex({"items.product":1})
  //Why nested indexex?
/*
betters-->searching,sorting,filters,performances*/