import { createSlice } from "@reduxjs/toolkit";

const recipesSlide = createSlice({
    name: "recipes",
    initialState: {
        list: [{ "id": 1, "create_date": "2023-01-16 20:34:09.196000", "description": "mo ta", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1673173529/enafyrdsy66jcu7kusxy.jpg", "name": "cong thuc 1", "note": "5 chu y", "point": 2, "processing_steps": "5 buoc", "views": 0, "creator_id": 1 },
        { "id": 2, "create_date": "2023-01-16 21:10:40.250000", "description": "mo ta 2", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1673173529/enafyrdsy66jcu7kusxy.jpg", "name": "cong thuc 2", "note": "5 chu y", "point": 2, "processing_steps": "5 buoc", "views": 0, "creator_id": 2 },
        { "id": 4, "create_date": "2023-01-16 21:15:30.450000", "description": "mo ta 3", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1673173529/enafyrdsy66jcu7kusxy.jpg", "name": "cong thuc 3", "note": "5 chu y", "point": 2, "processing_steps": "5 buoc", "views": 0, "creator_id": 3 },
        { "id": 5, "create_date": "2023-02-01 11:51:52.688000", "description": "mo ta 4", "image_url": "link image 4", "name": "cong thuc 4", "note": "note 5", "point": 4, "processing_steps": "5 steps", "views": 0, "creator_id": 1 },
        { "id": 6, "create_date": "2023-02-01 11:56:43.573000", "description": "description", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675251266/djpxjskwuboezez8caur.jpg", "name": "recipe 5", "note": "note", "point": 0, "processing_steps": "step1...", "views": 0, "creator_id": 1 },
        { "id": 8, "create_date": "2023-02-01 12:09:13.923000", "description": "description", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675251266/djpxjskwuboezez8caur.jpg", "name": "recipe 1", "note": "note", "point": 0, "processing_steps": "step1...", "views": 0, "creator_id": 1 },
        { "id": 9, "create_date": "2023-02-01 12:10:07.464000", "description": "description", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675251266/djpxjskwuboezez8caur.jpg", "name": "recipe 1 ", "note": "note", "point": 0, "processing_steps": "step1...", "views": 0, "creator_id": 1 },
        { "id": 10, "create_date": "2023-02-01 12:33:41.661000", "description": "description", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675251266/djpxjskwuboezez8caur.jpg", "name": "recipe 6", "note": "note", "point": 0, "processing_steps": "step1...\nstep2...", "views": 0, "creator_id": 1 },
        { "id": 11, "create_date": "2023-02-01 12:37:49.374000", "description": "mo ta 7", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675255063/n5hzpvzecmtoeqpbjoym.jpg", "name": "recipe 7", "note": "note 6", "point": 10, "processing_steps": "buoc 1:...\nbuoc 2:...", "views": 0, "creator_id": 1 },
        { "id": 12, "create_date": "2023-02-01 12:39:33.673000", "description": "mo ta 7", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675255063/n5hzpvzecmtoeqpbjoym.jpg", "name": "recipe 8", "note": "note 6", "point": 10, "processing_steps": "buoc 1:...\nbuoc 2:...", "views": 0, "creator_id": 1 },
        { "id": 13, "create_date": "2023-02-01 12:49:52.488000", "description": "mo ta 7", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675255063/n5hzpvzecmtoeqpbjoym.jpg", "name": "recipe 9", "note": "note 6", "point": 10, "processing_steps": "buoc 1:...\nbuoc 2:...", "views": 0, "creator_id": 1 },
        { "id": 14, "create_date": "2023-02-01 12:52:48.276000", "description": "mo ta 7", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675255063/n5hzpvzecmtoeqpbjoym.jpg", "name": "recipe 10", "note": "note 6", "point": 10, "processing_steps": "buoc 1:...\nbuoc 2:...", "views": 0, "creator_id": 1 },
        { "id": 15, "create_date": "2023-02-01 12:54:44.456000", "description": "mota 11", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675256077/f5qsdupzrlpcsvq7wlab.jpg", "name": "recipe 11", "note": "note 11", "point": 1, "processing_steps": "buoc 1", "views": 0, "creator_id": 1 },
        { "id": 16, "create_date": "2023-02-01 13:13:54.219000", "description": "mota 11", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675256077/f5qsdupzrlpcsvq7wlab.jpg", "name": "recipe 12", "note": "note 11", "point": 1, "processing_steps": "buoc 1", "views": 0, "creator_id": 1 },
        { "id": 17, "create_date": "2023-02-01 13:24:37.879000", "description": "mo ta 13", "image_url": "https://res.cloudinary.com/dmdozqjdg/image/upload/v1675257863/ldluwhhornmaql0jfemq.jpg", "name": "recipe 13", "note": "L\u01b0u \u00fd 1: \nL\u01b0u \u00fd 2:", "point": 0, "processing_steps": "B\u01b0\u1edbc 1: abc\nB\u01b0\u1edbc 2: abc\nB\u01b0\u1edbc 3: abc", "views": 0, "creator_id": 1 }]
    },
    reducers: {
    }
})

export default recipesSlide.reducer;