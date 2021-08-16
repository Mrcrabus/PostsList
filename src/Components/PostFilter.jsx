import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder='Search'
            />
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue={'sort by'}
                options={[
                    {value: 'title', name: 'Name'},
                    {value: 'body', name: 'Descriptions'}
                ]}
            />
        </div>
    );
};

export default PostFilter;