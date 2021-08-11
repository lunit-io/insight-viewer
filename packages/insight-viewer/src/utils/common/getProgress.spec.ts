import { getProgress } from './getProgress'

describe('getProgress()', () => {
  it('initially', () => {
    const result = getProgress({
      loadedCount: 0,
      totalCount: 1,
      progress: 0,
    })

    expect(result).toBe(0)
  })

  describe('for single image', () => {
    it('progress state 0', () => {
      const result = getProgress({
        loadedCount: 0,
        totalCount: 1,
        progress: 0,
      })

      expect(result).toBe(0)
    })

    it('progress state 50', () => {
      const result = getProgress({
        loadedCount: 0,
        totalCount: 1,
        progress: 50,
      })

      expect(result).toBe(50)
    })

    it('progress state 100', () => {
      const result = getProgress({
        loadedCount: 0,
        totalCount: 1,
        progress: 100,
      })

      expect(result).toBe(100)
    })
  })

  describe('for multiple images', () => {
    describe('first image of 3', () => {
      it('progress state 0', () => {
        const result = getProgress({
          loadedCount: 0,
          totalCount: 3,
          progress: 0,
        })

        expect(result).toBe(0)
      })

      it('progress state 50', () => {
        const result = getProgress({
          loadedCount: 0,
          totalCount: 3,
          progress: 50,
        })

        expect(result).toBe(16)
      })

      it('progress state 100', () => {
        const result = getProgress({
          loadedCount: 0,
          totalCount: 3,
          progress: 100,
        })

        expect(result).toBe(33)
      })
    })

    describe('second image of 3', () => {
      it('progress state 0', () => {
        const result = getProgress({
          loadedCount: 1,
          totalCount: 3,
          progress: 0,
        })

        expect(result).toBe(33)
      })

      it('progress state 50', () => {
        const result = getProgress({
          loadedCount: 1,
          totalCount: 3,
          progress: 50,
        })

        expect(result).toBe(50)
      })

      it('progress state 100', () => {
        const result = getProgress({
          loadedCount: 1,
          totalCount: 3,
          progress: 100,
        })

        expect(result).toBe(66)
      })
    })

    describe('last image of 3', () => {
      it('progress state 0', () => {
        const result = getProgress({
          loadedCount: 2,
          totalCount: 3,
          progress: 0,
        })

        expect(result).toBe(66)
      })

      it('progress state 50', () => {
        const result = getProgress({
          loadedCount: 2,
          totalCount: 3,
          progress: 50,
        })

        expect(result).toBe(83)
      })

      it('progress state 100', () => {
        const result = getProgress({
          loadedCount: 2,
          totalCount: 3,
          progress: 100,
        })

        expect(result).toBe(100)
      })
    })
  })

  it('all images are loaded', () => {
    const result = getProgress({
      loadedCount: 3,
      totalCount: 3,
      progress: 100,
    })

    expect(result).toBe(100)
  })
})
