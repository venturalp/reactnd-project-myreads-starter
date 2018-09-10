import React from 'react'
import { shallow } from 'enzyme'
import Book from './Book'

describe('[Component] Book', () => {
    it('it must render ok', () => {
        const onchangedShelf = (info, value) => {};
        const book = (<Book info={{changedShelf: onchangedShelf, authors: ['Author1', 'Author2'], shelf: 'wantToRead', title:'The Linux Command Line', imageLinks:{smallThumbnail : 'http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api'}}}/>)
        const bookTest = shallow(book);

        expect(bookTest).toBe(book);
    })
})