import { faker } from '@faker-js/faker'

export type dummyDataTs = {
  id: number
  name: string
  email: string
  company: string
  content: string
  title: string
  krw: number
  date: Date
  gender: string
}
function makeDummyData(count: number) {
  const dummyData: dummyDataTs[] = []
  for (let i = 1; i <= count; i++) {
    const firstName = faker.name.firstName()
    const gender = i % 2 === 0
    dummyData.push({
      id: i,
      name: firstName,
      email: faker.internet.email(firstName),
      company: faker.company.companyName(),
      title: faker.name.jobTitle(),
      content: faker.commerce.productDescription(),
      krw: faker.datatype.number({ min: 1000, max: 100000000 }),
      date: faker.date.between('2020-01-01 00:00:00', '2022-6-01 00:00:00'),
      gender: faker.name.gender(gender),
    })
  }
  return dummyData
}

const DUMMY_COUNT = 100
const dummyData: dummyDataTs[] = makeDummyData(DUMMY_COUNT)
const TIMEOUT = 1000

// API
// dummyData 하나를 호출합니다.
export function fetchById(targetId: number) {
  return toAsyncAPI(() => dummyData.find(({ id }) => id === targetId))
}

// dummyData 하나를 생성하고 배열 맨 아래에 추가합니다.
export async function create(data: dummyDataTs) {
  const id = dummyData[dummyData.length - 1].id + 1
  dummyData.push({ ...data, id })
  return fetchById(id)
}

// dummyData 하나를 업데이트 합니다.
export async function update(data: dummyDataTs) {
  return toAsyncAPI(() => {
    const index = dummyData.findIndex(({ id }) => id === data.id)
    dummyData[index] = data
    return dummyData[index]
  })
}

// dummyData 하나를 삭제합니다.
export async function deleteById(targetId: number) {
  return toAsyncAPI(() => {
    const index = dummyData.findIndex(({ id }) => id === targetId)
    dummyData.splice(index, 1)
    return targetId
  })
}
// dummyData 전체를 호출합니다.
export async function fetchList<T>(
  timer?: number,
  isErrorCall?: boolean
): Promise<T[]> {
  if (isErrorCall) throw new Error()
  return toAsyncAPI<T>(() => dummyData, timer)
}

// async
function toAsyncAPI<T>(action: () => any, timer?: number): Promise<T[]> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(action())
      },
      timer ? timer : TIMEOUT
    )
  })
}
